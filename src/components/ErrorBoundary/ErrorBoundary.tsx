import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container, Alert } from '@mui/material';
import { themeColors } from '@/config/theme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary component to catch React errors
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: themeColors.error, mb: 1 }}>
              Something went wrong
            </Typography>
            <Typography variant="body2" sx={{ color: themeColors.text.secondary, mb: 2 }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={this.handleRetry}
                sx={{ 
                  bgcolor: themeColors.error,
                  '&:hover': { bgcolor: themeColors.error }
                }}
              >
                Try Again
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => window.location.reload()}
                sx={{ 
                  borderColor: themeColors.error,
                  color: themeColors.error,
                  '&:hover': { 
                    borderColor: themeColors.error,
                    bgcolor: 'rgba(239, 68, 68, 0.1)'
                  }
                }}
              >
                Refresh Page
              </Button>
            </Box>
          </Alert>

          {/* Show error details in development */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              bgcolor: 'rgba(239, 68, 68, 0.1)', 
              borderRadius: 1,
              border: `1px solid ${themeColors.error}`
            }}>
              <Typography variant="h6" sx={{ color: themeColors.error, mb: 1 }}>
                Error Details (Development Only)
              </Typography>
              <Typography variant="body2" sx={{ color: themeColors.text.secondary, mb: 1 }}>
                <strong>Error:</strong> {this.state.error.message}
              </Typography>
              <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                <strong>Stack:</strong> {this.state.error.stack}
              </Typography>
            </Box>
          )}
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 