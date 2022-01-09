const config = require("../../config/config.json");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.development);

const initModels = require('../../models/init-models');
const models = initModels(sequelize);

const getSPPByNISN = async (nisn) => {
  try{
    let kelas = await models.siswa.findOne({raw: true, where: {nisn: nisn}});
    kelas = kelas.id_kelas;
    let angkatan = await models.kelas.findOne({raw: true, where: {id_kelas: kelas}});
    angkatan = angkatan.angkatan;
    let nominal = await models.spp.findOne({raw: true, where: {angkatan: angkatan}});
    return nominal.nominal;
  }catch(err){
    console.log(err);
  }
}

const create_entry = async (nisn, months, id_petugas) =>{
  const siswa = await models.siswa.findOne({raw: true,where: {nisn: nisn}});
  const tagihan = siswa.sisa_tunggakan;
  const biayaSPP = await getSPPByNISN(nisn);
  const jumlahBulanYangBelumDibayar = tagihan / biayaSPP;
  if(tagihan == 0){

    return({
      status: "fail",
      message: `tidak ada tagihan untuk siswa ${siswa.nama} `,
      code: 400
    });
    
  }else{
    
    try{
      if(months > jumlahBulanYangBelumDibayar){
        return({
          status: "fail",
          message: `tidak bisa membayar lebih dari ${jumlahBulanYangBelumDibayar} bulan! `,
          code: 400
        });

      }else{

        const curDate = new Date(); 
        const curYear = curDate.getFullYear();
        const curMonths = curDate.getMonth();
        const tagihanBaru = tagihan - (months * biayaSPP);
        const data = {
          id_petugas: id_petugas,
          nisn: nisn,
          tgl_bayar: curDate,
          bulan_spp: curMonths,
          tahun_spp: curYear
        }

        const result = await models.pembayaran.create(data, {raw: true});
        const resultUpdate = await models.siswa.update({sisa_tunggakan: tagihanBaru}, {where: {nisn: nisn}});
        
        return({
          status: "success",
          message: `sukses melakukan pembayaran dengan id: ${result.id_pembayaran}. sisa tunggakan : ${jumlahBulanYangBelumDibayar - months}`,
          code: 200
        });

      }

    }catch(err){
      console.log(err);
      return({
        status: "fail",
        message: `server error`,
        code: 400
      });
    }
  }
}

// const test = async (nisn, bulan) =>{
//   const siswa = await models.siswa.findOne({raw: true,where: {nisn: nisn}})
//   console.log({siswa})
//   console.log("SEBELUM : " + siswa.sisa_tunggakan)
  
//   const petugas = await models.petugas.findAll({raw: true})
//   const entrySpp = await create_entry(nisn, bulan, petugas[0].id_petugas)

//   const siswaBaru = await models.siswa.findOne({raw: true, where: {nisn: nisn}})
//   console.log("SESUDAH : " + siswaBaru.sisa_tunggakan)

//   console.log({entrySpp});

// }

// test("kkkkadjfljijwij", 1);
// module.exports = create_entry;