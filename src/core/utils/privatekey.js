import {JSEncrypt } from "jsencrypt"

export default {

    publickey:  `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwsirwLWQiFeZcx+ZGKaJ
    QcGkPfhEF1Mjgq/zpRc0lEkFp++L9HL+JMtWarK5PKffbsumxbv0b8mqAnxLZ41k
    aXJ/QkRGvUQPbI7Rdgs4UOhQt2Mdrzgy4tUoUz9kr4h2NTvVOaYjuw98AFxb7aAw
    +guazeMpAqt1ZSHY+xgMrpqhvVunNvi45OYc3csaiN9L0yE/flYg+y7ekooHuVBb
    ETtQTvPaSXalUGXDaEltOkibBQ60GefAKk7yyqE+cGik2kC+mJIF3UAzGumN5fOB
    R/UIIJ/Uxz5nCPsRV6zI1Hdv60TXM9qcwuqVXcwI+Wo4VNuA0cpFmHGXguvz8Jik
    xQIDAQAB
    -----END PUBLIC KEY-----`,

    encryptstring:(text, key)=> {

      const encryptProvider = new JSEncrypt();
      encryptProvider.setPublicKey(key);
  
      return encryptProvider.encrypt(text);
    }


  }