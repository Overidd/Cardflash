export const toggleModal = {
   show: (id: string) => {
      const modal = document.getElementById(id) as HTMLDialogElement;
      modal.show();
   },
   close: (id: string) => {
      const modal = document.getElementById(id) as HTMLDialogElement;
      modal.close();
   },
};
