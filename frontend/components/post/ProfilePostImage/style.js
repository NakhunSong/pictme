import styled from 'styled-components';

export const PostImagesWrapper = styled.div`
  position: relative;
  
  &:hover {
    cursor: pointer;

    .cover {
      display: flex;
      background: rgba(0, 0, 0, 0.3);
    }
  }
  
  .cover {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 100%;
    background: white;
  }
`;

export const HeartCounter = styled.div`
  font-size: 20px;
  .length {
    margin-left: 5px;
  }
  `;
export const CommentCounter = styled.div`
  font-size: 20px;
  .length {
    margin-left: 5px;
  }  
`;

export const Img = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  user-select: none;
`;
