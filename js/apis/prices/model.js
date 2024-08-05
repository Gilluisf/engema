class PricesModel extends FirebaseDatabaseFolderModel {
    folder = 'subjects'
    subjects
    constructor() {
        super()

        

        

        this.on('UPDATE', (obj) => {
            //this.subjects(getSubjects(obj))
        })
        //this.listenChange()
    }

    async getSubjectsOnly(){
        const filterSubjects = (obj) => {
            const subjects = [];
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const subjectsObj = obj[key];
                    for (const subject in subjectsObj) {
                        if (subjectsObj.hasOwnProperty(subject)) {
                            subjects.push(subject);
                        }
                    }
                }
            }
            return subjects;
        };
        var prices = await this.getAll()
        var filteredSubjects = filterSubjects(prices)
        var uniqueSubjects = [...new Set(filteredSubjects)]
        
        return uniqueSubjects
    }

    add(data) {
        var {
            grade,
            subject,
            price
        } = data
        return firebase.database().ref(`subjects/${grade}/${subject}`).set({
            price
        });

    }

    delete(data) {
        var {
            grade,
            subject,
            price
        } = data
        return firebase.database().ref(`subjects/${grade}/${subject}`).remove()
    }
}