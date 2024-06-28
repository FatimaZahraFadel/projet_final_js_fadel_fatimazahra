import { projectFirestore } from '../Config.js';

const addNewEvent = async (uid, data) => {
  if (data == null) {
    return;
  }
  const response = await projectFirestore.collection('events').add({ ...data, yesVotes: 0, noVotes: 0 });

  const userRef = projectFirestore.collection('users').doc(uid);
  const userDoc = await userRef.get();
  const user = userDoc.data();
  const events = user.createdEvents || [];
  events.push(response.id);
  await userRef.update({ createdEvents: events });
};

const appendVoteToEvent = async (eventId, uid, vote) => {
  const eventRef = projectFirestore.collection('events').doc(eventId);

  try {
    const doc = await eventRef.get();
    if (!doc.exists) {
      throw new Error('Event document does not exist.');
    }

    const currentVotes = doc.data().votes || [];
    currentVotes.push({ vote: vote, user: uid });
    await eventRef.update({ votes: currentVotes });

    const userRef = projectFirestore.collection('users').doc(uid);
    const userDoc = await userRef.get();
    const user = userDoc.data();
    const votedEvents = user.votedEvents || [];
    votedEvents.push({ eventId: eventId, vote: vote });
    await userRef.update({ votedEvents: votedEvents });

    console.log('Vote appended successfully!');
  } catch (error) {
    console.error('Error appending vote:', error);
  }
};

const updateVoteToEvent = async (eventId, uid, vote) => {
  const eventRef = projectFirestore.collection('events').doc(eventId);

  try {
    const doc = await eventRef.get();
    if (!doc.exists) {
      throw new Error('Event document does not exist.');
    }

    const currentVotes = doc.data().votes || [];
    const index = currentVotes.findIndex(vote => vote.user === uid);
    currentVotes[index].vote = vote;
    await eventRef.update({ votes: currentVotes });

    const userRef = projectFirestore.collection('users').doc(uid);
    const userDoc = await userRef.get();
    const user = userDoc.data();
    const votedEvents = user.votedEvents || [];
    const eventIndex = votedEvents.findIndex(vote => vote.eventId === eventId);
    votedEvents[eventIndex].vote = vote;
    await userRef.update({ votedEvents: votedEvents });

    console.log('Vote updated successfully!');
  } catch (error) {
    console.error('Error updating vote:', error);
  }
};

const deleteEvent = async (eventId) => {
  const eventRef = projectFirestore.collection('events').doc(eventId);

  try {
    const doc = await eventRef.get();
    if (!doc.exists) {
      console.error('Event does not exist');
      return;
    }

    const createdBy = doc.data().createdBy;
    const userRef = projectFirestore.collection('users').doc(createdBy);
    const userDoc = await userRef.get();

    const createdEvents = userDoc.data().createdEvents;
    const index = createdEvents.findIndex(event => event === eventId);
    if (index !== -1) {
      createdEvents.splice(index, 1);
      await userRef.update({ createdEvents: createdEvents });
    }

    const userVotes = userDoc.data().votedEvents;
    const eventIndex = userVotes.findIndex(vote => vote.eventId === eventId);
    if (eventIndex !== -1) {
      userVotes.splice(eventIndex, 1);
      await userRef.update({ votedEvents: userVotes });
    }

    await eventRef.delete();
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};

const updateEvent = async (eventId, data) => {
  const eventRef = projectFirestore.collection('events').doc(eventId);
  try {
    await eventRef.update(data);
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

export { addNewEvent, appendVoteToEvent, deleteEvent, updateEvent, updateVoteToEvent };
