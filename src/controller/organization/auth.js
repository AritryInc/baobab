import * as processor from '../../processor/organization/auth';
import Async from '../../utils/async-wrapper';

export const signup = Async(async (req, res) => {
  const { email, password, organizationId } = req.body;
  const user = await processor.signup({ email, password, organizationId });

  res.status(201).json({
    status: 'ok',
    user,
  });
});

export const signin = Async(async (req, res) => {
  const { email, password, organizationId } = req.body;
  const user = await processor.signin({ email, password, organizationId });

  res.status(200).json({
    status: 'ok',
    user,
  });
});
