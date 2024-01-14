import {string, object, ref} from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = object().shape({
    email: string().email('Not valid email').required('Email is required'),
    password: string().required('Password is required')
        .min(12, "Password must have at least 12 characters")
        .max(64, "Password must have max 64 characters"),
    password2: string().required('Please retype your password')
        .oneOf([ref('password')], 'Your passwords do not match'),
    street: string().required('Street is required'),
    city: string().required("City is required"),
    zipCode: string().required("Postcode is required"),
    houseNumber: string().min(1, "House number is required"),
    flatNumber: string(),
    firstname: string().required('Name is required'),
    lastname: string().required('Surname is required'),
})

const resolver = yupResolver(schema)

export { resolver }