import LoadingSvg from '@mui/icons-material/Cached';
import styled from '@emotion/styled';

const LoadingWrap = styled('div')`
    position: fixed;
    z-index: 1999;
    background-color: #877979a8;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoadingIcon = styled(LoadingSvg)`
   @keyframes lds-hourglass {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        50% {
            transform: rotate(450deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        100% {
            transform: rotate(900deg);
        }
  }
  animation: lds-hourglass 2.2s infinite;
`
export default ({ visible }) => {
     return visible && (
        <LoadingWrap >
            <LoadingIcon />
        </LoadingWrap>)
}