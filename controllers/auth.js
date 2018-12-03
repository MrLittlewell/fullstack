const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const keys = require("../config/keys")


module.exports.login = async function(req, res) {
	const candidate = await User.findOne({email: req.body.email})

	if (candidate) {
		//проверка пароля
		const passwordResult = bcrypt.compareSycn(req.body.password, candidate.password)
		if (passwordResult) {
			//Генерация токина, пароли совпали
			const token = jwt.sign({
				email: candidate.email,
				userId: candidate._id
			}, keys.jwt, {expiresIn: 60 * 60})

			res.status(200).json({
				token: token
			})
		} else {
			//Пароли не совпали
			res.status(401).json({
				message: 'Пароли не совпадвают.'
			})
		}
	} else {
		//пользователя нет. ошибка
		res.status(404).json({
			message: 'пользователь с таким email не найден.'
		})
	}
}

module.exports.register = async function(req, res) {

	const candidate = await User.findOne({email: req.body.email})

	if (candidate) {
		//пользователь существует, нужно отправить ошибку
		res.status(409).json({
			message: 'Такой email уже занят'
		})
	} else {
		//Нужно создать пользователя
		const salt = bcrypt.genSaltSync(10)
		const password = req.body.password
		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt)
		})
		try {
			await user.save()
			res.status(201).json(user)
		} catch(e) {
			//Обработать ошибку
		}
		
	}
}

//НАЙТИ ОШИБКУ. ПОСМОТРЕТЬ ПРОШЛЫЙ УРОК