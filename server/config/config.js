module.exports = {
  hostname: process.argv[2] || process.env.HOSTNAME || '127.0.0.1',
  port: process.argv[3] || process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  smtpEmail: process.env.MAILER_EMAIL || 'hrms',
  smtpEmailPass: process.env.MAILER_PASSWORD,
  arrKeys: ['login', 'password', 'firstName', 'lastName', 'position', 'email', 'phone', 'type', 'manager', 'teamlead', 'department', 'hr', 'roles'],
  arrKeysIssues: ['name', 'excerpt', 'status', 'content', 'assignTo', 'reassigned'],
  frontURI: process.env.FRONT_URI,
};
