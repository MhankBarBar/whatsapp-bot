const axios = require('axios').default;

module.exports = async () => {
	try {
		const response = await axios.get('https://ostch.herokuapp.com/api/v1/corona/');
		const { positif, sembuh, meninggal, dirawat } = response.data[0];
		let korona = 'Data Korona Indonesia Saat ini 🦠\n\n';
		korona += `😔 Positif : ${positif}\n`;
		korona += `😊 Sembuh : ${sembuh}\n`;
		korona += `😭 Meninggal : ${meninggal}\n`;
		korona += `🤒 Dirawat : ${dirawat} \n`;
		// console.log(korona);
		return korona;
	} catch (error) {
		return error;
	}
};
