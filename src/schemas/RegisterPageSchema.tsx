import * as yup from "yup"

export  const registerPageSchema = yup.object().shape({
    userName : yup.string().required("Kullanıcı adı boş geçilemez"),
    password : yup.string().required("Şİfre alanı boş olamaz")
})