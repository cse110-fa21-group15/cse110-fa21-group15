const getUser = require("../source/assets/scripts/firebase.js");

test('check if getUser is working', () => {
    expect(getUser('ojS6JF7SKbVKnkMYrj0HymY0dQD2')).toBe(true);
});