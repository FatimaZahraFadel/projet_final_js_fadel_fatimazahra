import { projectFirestore } from '../Config.js';
import { ref } from 'vue';

// Fetch all events
const getEvents = () => {
    const posts = ref([]);
    const error = ref(null);

    const load = async () => {
        try {
            const querySnapshot = await projectFirestore.collection('events').get();
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
            });
            posts.value = documents;
        } catch (err) {
            error.value = err.message;
        }
    };

    return { posts, error, load };
};

// Fetch a single event by ID
const getEvent = async (id) => {
    try {
        const doc = await projectFirestore.collection('events').doc(id).get();
        if (!doc.exists) {
            throw Error('That event does not exist');
        }
        return { id: doc.id, ...doc.data() };
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

// Delete an event by ID
const deleteEvent = async (id) => {
    try {
        await projectFirestore.collection('events').doc(id).delete();
    } catch (err) {
        console.error('Error deleting event:', err.message);
    }
};

// Update an event by ID
const updateEvent = async (id, updatedData) => {
    try {
        await projectFirestore.collection('events').doc(id).update(updatedData);
    } catch (err) {
        console.error('Error updating event:', err.message);
    }
};

// Update event votes
const updateEventVotes = async (id, type) => {
    try {
        const eventRef = projectFirestore.collection('events').doc(id);
        const doc = await eventRef.get();
        if (!doc.exists) {
            throw Error('Event does not exist');
        }
        const currentVotes = doc.data();
        if (type === 'yes') {
            currentVotes.yesVotes = (currentVotes.yesVotes || 0) + 1;
        } else if (type === 'no') {
            currentVotes.noVotes = (currentVotes.noVotes || 0) + 1;
        }
        await eventRef.update(currentVotes);
    } catch (err) {
        console.error('Error updating votes:', err.message);
    }
};

export { getEvents, getEvent, deleteEvent, updateEvent, updateEventVotes };
