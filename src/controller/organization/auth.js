import * as processor from '../../processor/organization/auth';

export const signup = async (req, res) => {
  try {
    const { email, password, organizationId } = req.body;
    const user = await processor.signup({ email, password, organizationId });

    res.status(201).json({
      status: 'ok',
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(error.status).json({
      status: error.message,
    });
  }
};

export const signin = () => 0;
