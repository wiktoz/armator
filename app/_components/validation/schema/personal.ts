import {string, object} from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = object().shape({
    firstname: string().required('Name is required'),
    lastname: string().required('Surname is required'),
    email: string().email('Not valid email').required('Email is required')
})

const resolver = yupResolver(schema)

export { resolver }