import React, {useState} from 'react';
import './index.scss';

export default function Upload(props) {
  const [fileValidation, setFileValidation] = useState(false);

  const onChangeHandler = event => {
    const file = event.target.files[0];

    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener('load', () => {
        const text = reader.result.split(new RegExp('(?:\r\n){2,}', 'g'))
          .filter(movie => Boolean(movie))
          .map(e => e.split('\n'))
          .map(movie => movie.map(e => e.split(': ')))
          .map(e => e.reduce(function (result, element) {
            result[element[0]] = element[1];
            return result;
          }, {}));

        setFileValidation(false);
        setMovieList({
          selectedFile: file,
          invalidFile: false,
          text
        });
      });
    } else {
      setFileValidation(true);
    }
  };

  function setMovieList(fileContent) {
    props.getMovieList(fileContent);
  }

  return (
    <div className={'upload-file'}>
      <input type="file" name="file" onChange={onChangeHandler}/>
      {fileValidation && <div className={'invalid'}>Invalid file type. Please upload text file.</div>}
    </div>
  );
}