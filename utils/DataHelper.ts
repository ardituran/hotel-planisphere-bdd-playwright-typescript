import { fakerID_ID as faker } from '@faker-js/faker';

export default class DataHelper {
  
  // Method to create dummy data for the user
  static generateGuestData() {
    // Make random first name and last name
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    // Create a random 2-digit number (10 to 99)
    const randomNumber = faker.number.int({ min: 10, max: 99 });
    
    return {
      // Combine first name and last name
      name: `${firstName} ${lastName}`,
      // Make email like: johnsmith88@mailinator.com
      email: `${firstName}${lastName}${randomNumber}@mailinator.com`.toLowerCase(),
      // Phone must start with '08' and have 11 digits in total
      phone: `08${faker.string.numeric(9)}`,
      // Make a random short sentence (max 140 characters)
      request: faker.lorem.sentence().substring(0, 140),
    };
  }

  // Method to accept specific rank and follow spreadsheet rules
  static generateAccountData(rankType: string) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const randomNumber = faker.number.int({ min: 100, max: 999 });
    
    // Create a random date of birth (min 18, max 110 years old)
    const dob = faker.date.birthdate({ min: 18, max: 110, mode: 'age' });
    
    // Format Date to YYYY-MM-DD for Sign Up Page
    const formattedDob = `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, '0')}-${String(dob.getDate()).padStart(2, '0')}`;

    // Determine rank boolean based on step parameter
    let isPremium = faker.datatype.boolean(); // Default random for 'Random' type
    if (rankType === 'Premium') isPremium = true;
    if (rankType === 'Normal') isPremium = false;

    return {
      email: `${firstName}${lastName}${randomNumber}@mailinator.com`.toLowerCase(),
      // Static password requested in the spreadsheet
      password: `Tester@123`,
      username: `${firstName} ${lastName}`,
      isPremium: isPremium,
      // Generate a full address (Street + City + Province + Zip Code)
      address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`,
      // Ensure 11 digits total
      phone: `08${faker.string.numeric(9)}`,
      // Values match exactly with dropdown options (0, 1, 2, 9)
      gender: faker.helpers.arrayElement(['0', '1', '2', '9']),
      dob: formattedDob,
      // Randomly check notification box
      wantsNotification: faker.datatype.boolean()
    };
  }

  // Method to get rules for each plan (like max guests or max stay)
  static getPlanConstraints(planName: string) {
    // Pick a random date from today up to the next 90 days
    const checkInDate = faker.date.soon({ days: 90 });
    
    // Format the date
    const month = String(checkInDate.getMonth() + 1).padStart(2, '0');
    const day = String(checkInDate.getDate()).padStart(2, '0');
    const year = checkInDate.getFullYear();
    
    // MM/DD/YYYY for the Reservation Page
    const formattedDate = `${month}/${day}/${year}`;

    // Set default limits for normal plans
    let maxStay = 9;
    let minGuest = 1;
    let maxGuest = 9;

    // Change the limits based on our spreadsheet rules
    if (planName === 'Staying without meals') { maxGuest = 2; }
    if (planName === 'Business trip') { minGuest = 1; maxGuest = 2; }
    if (planName === 'With beauty salon') { maxGuest = 6; }
    if (planName === 'With private onsen') { maxStay = 3; maxGuest = 6; }
    if (planName === 'For honeymoon') { maxStay = 2; minGuest = 2; maxGuest = 2; }
    if (planName === 'With complimentary ticket') { maxStay = 5; }

    return {
      checkInDate: formattedDate,
      // Pick a random number of nights within the limit
      stayNights: String(faker.number.int({ min: 1, max: maxStay })),
      // Pick a random number of guests within the limit
      guestsCount: String(faker.number.int({ min: minGuest, max: maxGuest })),
      // Randomly choose true or false for checkboxes
      wantsBreakfast: faker.datatype.boolean(),
      wantsEarlyCheckIn: faker.datatype.boolean(),
      wantsSightseeing: faker.datatype.boolean(),
      // Randomly choose true (Email) or false (Telephone)
      isEmail: faker.datatype.boolean()
    };
  }
}