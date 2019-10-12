import React, {useState} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function UserForm(props){
    const [user, setUser] = useState({name: '', email: '', password: ''});
    return (
        <Form>
            {props.touched.name && props.errors.name && <p>{props.errors.name}</p>}
            <Field type="text" name="name" id="name" placeholder="Name" />
            <br />
            {props.touched.email && props.errors.email && <p>{props.errors.email}</p>}
            <Field type="email" name="email" id="email" placeholder="E-Mail" />
            <br />
            {props.touched.password && props.errors.password && <p>{props.errors.password}</p>}
            <Field type="password" name="password" id="password" placeholder="Password" />
            <br />
            {props.touched.tos && props.errors.tos && <p>{props.errors.tos}</p>}
            <label htmlFor="tos">Accept Terms of Service: </label>
            <Field type="checkbox" name="tos" id="tos" checked={props.tos}/>
            <br />
            <button type="submit">Submit</button>
        </Form>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return {name: name || '',
                email: email || '',
                password: password || '',
                tos: tos || false}
    },
    // ================== Validation ==============================
    validationSchema: Yup.object().shape({
        name: Yup.string()
                 .max(20, 'Name must be less than 20 characters')
                 .required(),
        email: Yup.string()
                  .email()
                  .required(),
        password: Yup.string()
                     .min(6, 'Password must be at least 6 characters in length')
                     .required()
                     .matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/g, 'Password must contain 1 number, 1 uppercase letter, and 1 lowercase letter'),
        tos: Yup.bool()
                .oneOf([true], 'You must accept the Terms of Service')
                .required()
    }),
    // ================== Handle Submit ===========================
    handleSubmit(values, FormikBag){
        console.log(values, FormikBag);
        axios.post('https://reqres.in/api/users')
            .then(res => console.log(res))
            .catch(err => console.log(`Error: ${err}`));
    }
})(UserForm);

export default FormikUserForm;