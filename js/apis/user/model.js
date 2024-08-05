class UserModel {
	email
	password
	onChange(callBack){
		var {
			uid
		} = this.currentUser

		firebase.database().ref(`users/${uid}`).on('value', snapShot => {
 			let data = snapShot.val()
 			callBack(data)

 		})
	}
	get currentUser() {
		return firebase.auth().currentUser
	}

	createAccount() {
		return firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
	}

	signIn() {
		return firebase.auth().signInWithEmailAndPassword(this.email, this.password)
	}

	get personalData() {
		var {
			uid
		} = this.currentUser
		var userRef = firebase.database().ref(`users/${uid}`)
		let set = (data) => {
			return userRef.set(data)
		}


		let get = async () => {
			var snapShot = await userRef.once('value')
			let data = snapShot.toJSON() || {type:'student'}
			if(data.subjects){
				data.subjects = Object.values(data.subjects)
			}
			return data
		}

		return {
			get,
			set
		}
	}
}

