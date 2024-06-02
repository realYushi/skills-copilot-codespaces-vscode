function skillsMember() {
    var skills = ['HTML', 'CSS', 'JS', 'PHP', 'SQL'];
    return {
        skills: skills,
        addSkill: function (skill) {
            skills.push(skill);
        }
    };
}