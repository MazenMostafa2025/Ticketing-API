import bcrypt from 'bcrypt';

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12); // 12 rounds for good security
    // console.log('salting')
    return await bcrypt.hash(password, salt);
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    // console.log('compare')
    return await bcrypt.compare(suppliedPassword, storedPassword);
  }
}

