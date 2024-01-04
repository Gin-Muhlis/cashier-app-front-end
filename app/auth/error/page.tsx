import React from 'react'

const Error = ({message}: {message: string}) => {
    return (
        <div>
          <h1>Oops! Terjadi Kesalahan</h1>
          <p>{message}</p>
        </div>
      );
}

export default Error