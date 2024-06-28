const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAgdy9yG3aEw8FNUiZDy1KIDJVmWPjhrkA",
    authDomain: "rattrapge-js.firebaseapp.com",
    projectId: "rattrapge-js",
    storageBucket: "rattrapge-js.appspot.com",
    messagingSenderId: "160680756906",
    appId: "1:160680756906:web:398edd51bcab9616f432d3"
  };
  

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Data to add
const jobsData =  
    events = [
        {
          id: "event001",
          title: "Concert de fin d'année",
          description: "Un concert pour célébrer la fin de l'année universitaire.",
          date: "2024-07-01T18:00:00Z",
          yesVotes: 100,
          noVotes: 20,
          image: "https://example.com/concert.jpg",
          createdAt: "2024-06-20T12:00:00Z",
          updatedAt: "2024-06-25T15:30:00Z"
        },
        {
          id: "event002",
          title: "Festival d'été",
          description: "Une célébration estivale avec de la musique et de la nourriture.",
          date: "2024-08-15T15:00:00Z",
          yesVotes: 150,
          noVotes: 30,
          image: "https://example.com/festival.jpg",
          createdAt: "2024-07-10T10:00:00Z",
          updatedAt: "2024-07-20T12:00:00Z"
        },
        {
          id: "event003",
          title: "Conférence Tech 2024",
          description: "Une conférence sur les dernières avancées technologiques.",
          date: "2024-09-10T09:00:00Z",
          yesVotes: 200,
          noVotes: 10,
          image: "https://example.com/conference.jpg",
          createdAt: "2024-08-01T08:00:00Z",
          updatedAt: "2024-08-15T10:00:00Z"
        },
        {
          id: "event004",
          title: "Expo Art Moderne",
          description: "Découvrez les œuvres des artistes contemporains les plus talentueux.",
          date: "2024-10-05T11:00:00Z",
          yesVotes: 250,
          noVotes: 5,
          image: "https://example.com/art.jpg",
          createdAt: "2024-09-01T09:00:00Z",
          updatedAt: "2024-09-15T12:00:00Z"
        },
        {
          id: "event005",
          title: "Marathon de la Ville",
          description: "Rejoignez-nous pour un marathon à travers les plus beaux sites de la ville.",
          date: "2024-11-01T06:00:00Z",
          yesVotes: 180,
          noVotes: 25,
          image: "https://example.com/marathon.jpg",
          createdAt: "2024-10-01T07:00:00Z",
          updatedAt: "2024-10-20T09:00:00Z"
        },
        {
          id: "event006",
          title: "Soirée Cinéma en Plein Air",
          description: "Profitez d'une soirée cinéma sous les étoiles avec vos amis et votre famille.",
          date: "2024-07-20T20:00:00Z",
          yesVotes: 220,
          noVotes: 15,
          image: "https://example.com/cinema.jpg",
          createdAt: "2024-06-25T10:00:00Z",
          updatedAt: "2024-07-10T12:00:00Z"
        },
        {
          id: "event007",
          title: "Fête de la Musique",
          description: "Venez célébrer la musique avec des concerts gratuits dans toute la ville.",
          date: "2024-06-21T14:00:00Z",
          yesVotes: 300,
          noVotes: 10,
          image: "https://example.com/fete_musique.jpg",
          createdAt: "2024-05-15T11:00:00Z",
          updatedAt: "2024-06-01T13:00:00Z"
        },
        {
          id: "event008",
          title: "Conférence sur le Développement Durable",
          description: "Apprenez-en plus sur les initiatives de développement durable.",
          date: "2024-10-10T09:00:00Z",
          yesVotes: 170,
          noVotes: 12,
          image: "https://example.com/developpement_durable.jpg",
          createdAt: "2024-09-01T08:00:00Z",
          updatedAt: "2024-09-20T10:00:00Z"
        },
        {
          id: "event009",
          title: "Atelier de Cuisine Végétarienne",
          description: "Participez à un atelier pour apprendre à cuisiner des plats végétariens délicieux.",
          date: "2024-07-15T15:00:00Z",
          yesVotes: 130,
          noVotes: 5,
          image: "https://example.com/cuisine.jpg",
          createdAt: "2024-06-10T09:00:00Z",
          updatedAt: "2024-06-25T11:00:00Z"
        },
        {
          id: "event010",
          title: "Bal de Noël",
          description: "Rejoignez-nous pour une soirée magique de danse et de festivités.",
          date: "2024-12-24T20:00:00Z",
          yesVotes: 400,
          noVotes: 30,
          image: "https://example.com/bal_noel.jpg",
          createdAt: "2024-11-15T10:00:00Z",
          updatedAt: "2024-12-01T12:00:00Z"
        }
    
  ];
  


// Function to add data to Firestore
const addJobsToFirestore = async (jobsData) => {
    try {
        // Loop through each job and add it to Firestore
        for (const job of jobsData) {
            // Use set with merge to add or update the document
            await db.collection('events').doc(job.id.toString()).set(job, { merge: true });
        }
        console.log("Jobs added to Firestore successfully!");
    } catch (error) {
        console.error("Error adding jobs to Firestore: ", error);
    }
};

// Call the function to add jobs data to Firestore
addJobsToFirestore(jobsData);