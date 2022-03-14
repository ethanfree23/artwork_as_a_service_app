module.exports = {
  definition: `
        extend type UsersPermissionsMe {
          fullName: String
          stripeId: String
          agreedToTerms: Boolean
        }
        extend input UsersPermissionsRegisterInput {
            fullName: String!
            role: Int!
            stripeId: String
            agreedToTerms: Boolean
        }
    `,
  type: {},
  resolver: {},
};
