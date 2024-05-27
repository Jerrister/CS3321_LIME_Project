
import axios from 'axios';

export async function FolderImporter() {
  console.log("Fetch!");

  
  await axios.get(' http://127.0.0.1:8848/get_folder')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("There was an error!", error);
  });
  console.log("DONE")

}



