import jwt from 'jsonwebtoken';

const secret = 'messiDefinitivamenteEsMejorqueMbappe';

export class jwtService {
  static sign(payload: object, expiresIn = '1h') {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
    
  }

  static verify(token: string) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return null;
    }
  }
};