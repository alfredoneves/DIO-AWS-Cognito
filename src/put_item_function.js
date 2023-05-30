var AWS = require('aws-sdk');   // importa o kit dev 
const dynamodb = new AWS.DynamoDB.DocumentClient(); // instancia um objeto do banco de dados

exports.handler = async (event) => {    // começa a função assíncrona
    
    let responseBody = ""
    let statusCode = 0
    
    let {id, price} = JSON.parse(event.body);   // proxy de API necess
    
    const params = {
      TableName : 'Items',
      /* Item properties will depend on your application concerns */
      Item: {   // esse Item é padrão para a manipulação de tabelas e não tem a ver com a tabela crida em si
         id: id,
         price: price
      }
    }
    
    try {
        
        await dynamodb.put(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify('Item inserido com sucesso!');
        
    } catch (err) {
          
        statusCode = 200;
        responseBody = JSON.stringify(err);
        
    }
      
    const response = {
        statusCode: statusCode,
        body: responseBody,
    };
    
    return response;
};
