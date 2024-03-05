
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ status, message, resetState }: {status: number, message: string, resetState: any}) => {

  useEffect(() => {
    Swal.fire({
      html: status === 200 ? `<strong>${message}</strong>` : `<strong>${message}</strong>`,
      icon: status === 200 ? 'success' : 'error',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        resetState();
      }
    });
  }, [status]);

  return null;
};

export default SweetAlert;
