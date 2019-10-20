import React from 'react';
import './index.scss';

class Upload extends React.Component {
    state = {
        selectedFile: null,
        invalidFile: false,
        text: null
    };

    onChangeHandler = event => {
        const file = event.target.files[0];
        if (file && file.type === "text/plain") {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.addEventListener('load', () => {
                const text = reader.result.split(new RegExp('(?:\r\n){2,}', 'g'))
                    .filter(movie => Boolean(movie))
                    .map(e => e.split('\n'))
                    .map(movie => movie.map(e => e.split(': ')))
                    .map(e => e.reduce(function(result, element) {
                        result[element[0]] = element[1];
                        return result;
                    }, {}));

                this.setState({
                    selectedFile: file,
                    invalidFile: false,
                    text
                }, this.setMovieList)
            });
        } else {
            this.setState({
                invalidFile: true
            })
        }
    };

    setMovieList = () => {
        this.props.getMovieList(this.state);
    };

    render() {
        return (
            <div className={'upload-file'}>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                {this.state.invalidFile && (
                    <div className={'invalid'}>Invalid file type. Please upload text file.</div>)}
            </div>
        )
    }
}

export default Upload;