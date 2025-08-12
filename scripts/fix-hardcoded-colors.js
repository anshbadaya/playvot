#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Color mapping from hardcoded to theme colors
const colorMapping = {
  // Primary colors
  '#3B82F6': 'colors.primary',
  '#2563EB': 'colors.primaryHover',
  '#1D4ED8': 'colors.primaryDark',
  '#1E40AF': 'colors.primaryHover',
  
  // Secondary colors
  '#8B5CF6': 'colors.secondary',
  '#7C3AED': 'colors.secondaryHover',
  '#A855F7': 'colors.secondary',
  
  // Status colors
  '#10B981': 'colors.success',
  '#059669': 'colors.successHover',
  '#F59E0B': 'colors.warning',
  '#D97706': 'colors.warningHover',
  '#EF4444': 'colors.error',
  '#DC2626': 'colors.errorHover',
  
  // Background colors
  '#0A0A23': 'colors.background.primary',
  '#111827': 'colors.background.secondary',
  '#0F172A': 'colors.background.tertiary',
  '#1E293B': 'colors.background.secondary',
  
  // Text colors
  '#FFFFFF': 'colors.text.primary',
  '#94A3B8': 'colors.text.muted',
  '#64748B': 'colors.text.disabled',
  '#F8FAFC': 'colors.text.primary',
  
  // Border colors
  '#6B7280': 'colors.text.muted',
  
  // Common gradients
  'linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)': 'colors.gradients.background',
  'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #10B981 100%)': 'colors.gradients.rainbow',
  'linear-gradient(135deg, #3B82F6, #8B5CF6)': 'gradients.primaryToSecondary',
  'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)': 'colors.gradients.primary',
  'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)': 'colors.gradients.secondary',
  'linear-gradient(135deg, #10B981 0%, #059669 100%)': 'colors.gradients.success',
  
  // Card gradients
  'linear-gradient(135deg, rgba(13, 20, 36, 0.9) 0%, rgba(23, 32, 48, 0.95) 100%)': 'colors.gradients.card',
  
  // Legacy colors (from old theme)
  '#4461F2': 'colors.primary',
  '#3451E2': 'colors.primaryHover',
  '#4B4EF9': 'colors.primary',
  '#60A5FA': 'colors.primary',
};

// Files to exclude
const excludeFiles = [
  'src/config/styledTheme.ts',
  'src/utils/colors.ts',
  'src/docs/COLOR_SYSTEM.md',
];

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      fileList = walkDir(filePath, fileList);
    } else if (stat.isFile() && /\.(tsx?|css|scss)$/.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function findHardcodedColors() {
  const files = walkDir('src').filter(file => 
    !excludeFiles.some(exclude => file.includes(exclude))
  );
  
  const results = [];
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const hexColorRegex = /#[0-9A-Fa-f]{3,6}/g;
    const gradientRegex = /linear-gradient\([^)]+\)/g;
    
    let match;
    const colors = [];
    
    // Find hex colors
    while ((match = hexColorRegex.exec(content)) !== null) {
      colors.push({
        type: 'hex',
        value: match[0],
        line: content.substring(0, match.index).split('\n').length,
        column: match.index - content.lastIndexOf('\n', match.index) - 1
      });
    }
    
    // Find gradients
    while ((match = gradientRegex.exec(content)) !== null) {
      colors.push({
        type: 'gradient',
        value: match[0],
        line: content.substring(0, match.index).split('\n').length,
        column: match.index - content.lastIndexOf('\n', match.index) - 1
      });
    }
    
    if (colors.length > 0) {
      results.push({
        file,
        colors
      });
    }
  });
  
  return results;
}

function replaceHardcodedColors(filePath, dryRun = true) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let replacements = [];
  
  // Replace colors
  Object.entries(colorMapping).forEach(([hardcoded, themeColor]) => {
    const regex = new RegExp(hardcoded.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (regex.test(content)) {
      const newContent = content.replace(regex, themeColor);
      if (newContent !== content) {
        replacements.push({
          from: hardcoded,
          to: themeColor
        });
        content = newContent;
        modified = true;
      }
    }
  });
  
  if (modified && !dryRun) {
    // Add import if needed
    if (!content.includes('import { colors') && !content.includes('from \'@/utils/colors\'')) {
      const importStatement = "import { colors } from '@/utils/colors';\n";
      content = importStatement + content;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  return { modified, replacements };
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const verbose = args.includes('--verbose') || args.includes('-v');
  
  console.log('🔍 Finding hardcoded colors...');
  const results = findHardcodedColors();
  
  if (results.length === 0) {
    console.log('✅ No hardcoded colors found!');
    return;
  }
  
  console.log(`\n📊 Found ${results.length} files with hardcoded colors:\n`);
  
  let totalReplacements = 0;
  
  results.forEach(({ file, colors }) => {
    console.log(`📁 ${file}`);
    colors.forEach(color => {
      console.log(`  ${color.type === 'hex' ? '🎨' : '🌈'} ${color.value} (line ${color.line}, col ${color.column})`);
    });
    
    if (!dryRun) {
      const { modified, replacements } = replaceHardcodedColors(file, false);
      if (modified) {
        console.log(`  ✅ Replaced ${replacements.length} colors`);
        totalReplacements += replacements.length;
        
        if (verbose) {
          replacements.forEach(rep => {
            console.log(`    ${rep.from} → ${rep.to}`);
          });
        }
      }
    }
    console.log('');
  });
  
  if (dryRun) {
    console.log('💡 Run with --dry-run=false to apply changes');
    console.log('💡 Run with --verbose to see detailed replacements');
  } else {
    console.log(`✅ Applied ${totalReplacements} replacements`);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  findHardcodedColors,
  replaceHardcodedColors,
  colorMapping
};
