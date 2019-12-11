import models from '../db/models';

const { User, Organization } = models;
const SignUp = (req, res) => {
    const { email, organization } = req.body;

    const user = User.create(email)
    console.log(email);
    const userOrganization = Organization.create(organization)
    return res.json({
        status: 201,
        user,
        userOrganization,
        message: 'User created successfully'
    })

}

export default SignUp;