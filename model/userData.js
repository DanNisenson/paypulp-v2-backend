const newClient = async () => await require("./newClient")();

class PaypulpCustomer {
  constructor(
    userId = null,
    userUuid = null,
    email = null,
    accountType = null,
    customerId = null,
    firstName = null,
    lastName = null,
    phone = null,
    birthDate = null,
    address = null,
    city = null,
    country = null,
    timeZone = null,
    securityQuestion = null,
    securityQuestionAnswer = null,
    creationTime = null
  ) {
    this.userId = userId;
    this.userUuid = userUuid;
    this.email = email;
    this.accountType = accountType;
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.birthDate = birthDate;
    this.address = address;
    this.city = city;
    this.country = country;
    this.timeZone = timeZone;
    this.securityQuestion = securityQuestion;
    this.securityQuestionAnswer = securityQuestionAnswer;
    this.creationTime = creationTime;
  }
}

class PersonalAccount extends PaypulpCustomer {
  constructor(
    userId,
    userUuid,
    email,
    accountType,
    customerId,
    firstName,
    lastName,
    phone,
    birthDate,
    address,
    city,
    country,
    timeZone,
    securityQuestion,
    securityQuestionAnswer,
    creationTime,
    personalId = null
  ) {
    super(
      userId,
      userUuid,
      email,
      accountType,
      customerId,
      firstName,
      lastName,
      phone,
      birthDate,
      address,
      city,
      country,
      timeZone,
      securityQuestion,
      securityQuestionAnswer,
      creationTime
    ),
      (this.personalId = personalId);
  }
}

const dataToPersonalInfo = (dataFromDb) => {
  const customerInfo = new PersonalAccount(
    (userId = dataFromDb.user_id),
    (userUuid = dataFromDb.user_uuid),
    (email = dataFromDb.email),
    (accountType = dataFromDb.account_type),
    (customerId = dataFromDb.customer_id),
    (firstName = dataFromDb.first_name),
    (lastName = dataFromDb.last_name),
    (phone = dataFromDb.phone),
    (birthDate = dataFromDb.birth_date),
    (address = dataFromDb.address),
    (city = dataFromDb.city),
    (country = dataFromDb.country),
    (timeZone = dataFromDb.time_zone),
    (securityQuestion = dataFromDb.security_question),
    (securityQuestionAnswer = dataFromDb.security_question_answer),
    (creationTime = dataFromDb.creation_time),
    (personalId = dataFromDb.personal_id)
  );
  return customerInfo;
};

class UserDataManager {
  static getCustomerData = async (userUuid) => {
    const pgClient = await newClient();
    const dbRes = await pgClient.query(
      "SELECT * FROM users INNER JOIN paypulp_customers ON users.user_uuid = paypulp_customers.user_uuid INNER JOIN personal_accounts ON paypulp_customers.customer_id = personal_accounts.customer_id WHERE users.user_uuid = ($1);",
      [userUuid]
    );
    pgClient.end();
    let userInfo = dataToPersonalInfo(dbRes.rows[0]);
    return userInfo;
  };

  static getUserName = async (id) => {
    const pgClient = await newClient();
    const dbRes = await pgClient.query(
      "SELECT first_name FROM paypulp_customers WHERE user_uuid = ($1);",
      [id]
    );
    pgClient.end();
    return dbRes.rows[0];
  };
}

module.exports = UserDataManager;
