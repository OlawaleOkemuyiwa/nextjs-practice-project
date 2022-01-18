//ccc4: This is an api route. when a request from any part of our app is sent (either post or get request with fetch or by axios) to our-domain/api/new-meetup (which is file based routing that matches this file i.e its the FBR of our choosing that dictates where the requests would be sent) then the defined exported function in this file is executed. The function is executed only on the serverside and never on the clientside so our credentials here are secured. 
//post request only (to our-domain/api/new-meetup) is here.

import { MongoClient } from 'mongodb';

async function handler(req, res) {        //req object contains data about the incoming request(either a post or get request) and the res object will be needed for sending back a response for the request sent

  if (req.method === 'POST') {
    console.log('inside our api route function')
    //get required data being posted by accessing the body property of the incoming request obj 
    const requestData = req.body;

    //establish a connection to the created cluster(database), if such database isnt already created/available then newly create one (themeetups database) and connect on the go
    const client = await MongoClient.connect('mongodb+srv://OlawaleOkemuyiwa:1Oluwaseun_@cluster0.enqpf.mongodb.net/themeetups?retryWrites=true&w=majority')
    
    //call db method of client obj to get hold of the database connected to
    const themeetupsdb = client.db();

    //Create(if not already there) a 'meetups' collection in the 'themeetups' database. MongoDB is a NoSQL db that works with collection full of documents(documents are basically JS objects). collection in NoSQL =~ table in SQL && documents =~ entries in SQL table. So we have collection which holds multiple documents (or table which holds multiple entries if SQL)
    const meetupsCollection = themeetupsdb.collection('meetups');

    //insert the requestData obj into the db. This returns a promise which is a result of insertion(e.g an object with an automatically id)
    const result = await meetupsCollection.insertOne(requestData);
    console.log(result);

    //close connection to the db once done
    client.close();

    //use res object to send back a response to the post request  
    res.status(201).json({ message: 'Meet up inserted!'})
  }
}

export default handler;