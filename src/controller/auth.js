import models from '../db/models';

const { User, Organization } = models;
const SignUp = (req, res) => {
    const { email, organization } = req.body;
    if (!email) {
        return(console.log('error', error));
    }
    if (!organization) {
        return(console.log('error', error))
    }
    const user = User.create(req.body.email)
    const userOrganization = Organization.create(req.body.organization)
    return res.json({
        status: 201,
        user,
        userOrganization,
        message: 'User created successfully'
    })

}

export default SignUp;