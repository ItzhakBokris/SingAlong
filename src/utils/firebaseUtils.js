export const snapshotToObject = (snapshot) => ({...snapshot.val(), key: snapshot.key});

export const snapshotToArray = (snapshot) => {
    const result = [];
    snapshot.forEach(childSnapshot => {
        result.push(snapshotToObject(childSnapshot))
    });
    return result;
};
