import { colors } from '@/utils/colors';
import styled from 'styled-components';

export const StyledBackground = styled.div`
  background: 
    radial-gradient(circle at 20% 20%, ${colors.primaryLight} 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, ${colors.secondaryLight} 0%, transparent 50%),
    radial-gradient(circle at 40% 70%, ${colors.successLight} 0%, transparent 50%),
    ${colors.gradients.background};
`;