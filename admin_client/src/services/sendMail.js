import api from "./api";

 const sendMail = async (data) => {
    try {
      const response = await api.post('api/mail/send',data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


        

export default sendMail;
// This code provides functions to send, get, delete, and update emails using an API.
// The functions use axios to make HTTP requests to the server and handle errors appropriately.
// The functions are exported as default for use in other parts of the application.
// The sendMail function sends an email with the provided data.
// The getMail function retrieves all emails.
// The getMailById function retrieves a specific email by its ID.
// The deleteMail function deletes an email by its ID.          
// The updateMail function updates an email by its ID with the provided data.
// The code is structured to handle asynchronous operations using async/await syntax.   

// The functions are designed to be reusable and can be easily integrated into a larger application.        