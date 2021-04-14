import styled from 'styled-components'
export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: -webkit-linear-gradient(left top, #67c8b7, #3577cd);
`
export const ContentScroll = styled.div`
	width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	height: calc(100% - 70px);
	border-bottom: 1px #f1f2f3 solid;
	padding: 5px;
	&::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background-color: #1bb2b7;
	}
	&::-webkit-scrollbar-track {
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background-color: #c2eeed;
	}
`
