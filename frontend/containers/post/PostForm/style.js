import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PostFormWrapper = styled.form`
  max-width: 410px;
  max-height: 800px;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 10px;
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 5px;

  .seperator {
    width: 100%;
    height: 1px;
    background: #e6e6e6;
    margin-top: 1.5rem;
    position: relative;
    margin-bottom: 1.5rem;
    .or {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-weight: 900;
        color: e6e6e6;
        font-size: 0.9rem;
    }
  }
  .image {
    height: 300px;
    .upload-image {
      height: 250px;
      border-bottom: 1px solid #e6e6e6;

      .images-wrapper {
        display: flex; 
        justify-content: space-around;


        .image-preview {
          position: relative;
          display: inline-block;
          border: 1px solid #e6e6e6;
  
          .remove-image-button {
            position: absolute;
            top: 5px;
            right: 5px;
            color: red;
            &:hover {
              transform: scale(1.2, 1.2);
              cursor: pointer;
            }
          }

        }

      }
    }
    
    .upload-button {
      margin-top: 5px;
      text-align: right;
    }
  }
  .description {
    margin-top: 60px;
    height: 300px;

    textarea {
      resize: none;
      height: 250px;
    }
  }

  .submit-button {
    text-align: right;
  }
`;

export const TitleWrapper = styled.div`
  margin-top: 10px;
  .title {
    font-size: 30px;
    font-weight: 600;
    text-align: center;
  }
  .description {
    margin-top: 15px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  button {
    margin-top: 15px;
  }
  .seperator {
    width: 100%;
    height: 1px;
    background: #e6e6e6;
    margin-top: 1.5rem;
    position: relative;
    margin-bottom: 1.5rem;
    .or {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-weight: 900;
        color: e6e6e6;
        font-size: 0.9rem;
    }
  }
`;
