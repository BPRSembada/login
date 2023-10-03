export const header = {
  headers: {
    authorization: `Bearer ${localStorage.token}`,
  },
};

export const API_SIMPANAN = "https://apiservice.banksembada.com/simpanan";

export const API_PINJAMAN = "https://apiservice.banksembada.com/pinjaman";

export const API_KEMITRAAN = "https://apiservice.banksembada.com/kemitraan";

export const API_SDB = "https://apiservice.banksembada.com/sdb";

export const API_LOGIN_USER = "http://localhost:127/auth/login";

export const API_GET_DATA_USER = "http://localhost:127/auth/user_karyawan";

export const API_PENGADUAN_NASABAH =
  "https://apiservice.banksembada.com/pengaduan";

export const API_Dummy_users = "http://localhost:127/users";
