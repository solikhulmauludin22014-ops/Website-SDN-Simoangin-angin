import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { SCHOOL, PRINCIPAL } from "@/lib/school-config";

// VERCEL FIX: Do not use Font.register with http urls, as it causes 500 timeouts on Vercel.
// We use the built-in "Times-Roman" and "Times-Bold" fonts instead.

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 60,
    paddingRight: 60,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
  },
  // KOP SURAT
  headerContainer: {
    borderBottomWidth: 3,
    borderBottomColor: "#000",
    paddingBottom: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  headerGov: {
    fontSize: 13,
    fontFamily: "Times-Roman",
    textAlign: "center",
  },
  headerDept: {
    fontSize: 13,
    fontFamily: "Times-Roman",
    textAlign: "center",
  },
  headerSchool: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
  },
  headerAddress: {
    fontSize: 10,
    fontFamily: "Times-Roman",
    textAlign: "center",
  },
  headerContact: {
    fontSize: 10,
    fontFamily: "Times-Roman",
    textAlign: "center",
  },

  // TITLE & NUMBER
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    textDecoration: "underline",
  },
  titleNumber: {
    fontSize: 11,
    fontFamily: "Times-Roman",
    marginTop: 2,
  },

  // CONTENT
  text: {
    fontSize: 11,
    fontFamily: "Times-Roman",
    textAlign: "justify",
    marginBottom: 5,
  },
  boldText: {
    fontFamily: "Times-Bold",
  },
  
  // TABLE-LIKE ROW
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  colLabel: {
    width: 140,
    fontSize: 11,
    fontFamily: "Times-Roman",
  },
  colColon: {
    width: 10,
    fontSize: 11,
    fontFamily: "Times-Roman",
  },
  colValue: {
    flex: 1,
    fontSize: 11,
    fontFamily: "Times-Roman",
  },

  // SIGNATURE
  signatureContainer: {
    marginTop: 40,
    alignItems: "flex-end",
  },
  signatureBox: {
    width: 200,
  },
  signatureText: {
    fontSize: 11,
    fontFamily: "Times-Roman",
    marginBottom: 2,
  },
  signatureSpace: {
    height: 60,
  },
  signatureName: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    textDecoration: "underline",
  },
  signatureNip: {
    fontSize: 11,
    fontFamily: "Times-Roman",
  },

  // LIST
  listRow: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 20,
  },
  listNumber: {
    width: 20,
    fontSize: 11,
  },
  listText: {
    flex: 1,
    fontSize: 11,
  },
});

type LetterData = {
  letterType: string;
  studentName: string;
  nisn: string;
  studentClass: string;
  birthPlace: string;
  birthDate: Date;
  parentName: string;
  address: string;
  purpose: string;
  officialNumber: string;
  officialDate: Date;
  
  // Optional dynamic fields
  gender?: string | null;
  parentJob?: string | null;
  targetSchool?: string | null;
  previousSchool?: string | null;
  fatherName?: string | null;
  motherName?: string | null;
};

// Formatter for Indonesian Dates
const formatDate = (date: Date) => {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const KopSurat = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerGov}>PEMERINTAH KABUPATEN SIDOARJO</Text>
    <Text style={styles.headerDept}>DINAS PENDIDIKAN DAN KEBUDAYAAN</Text>
    <Text style={styles.headerSchool}>{SCHOOL.NAME}</Text>
    <Text style={styles.headerAddress}>{SCHOOL.ADDRESS}</Text>
    <Text style={styles.headerContact}>Pos-el {SCHOOL.EMAIL}</Text>
  </View>
);

const Signature = ({ officialDate, isHeadmaster = true }: { officialDate: Date, isHeadmaster?: boolean }) => (
  <View style={styles.signatureContainer}>
    <View style={styles.signatureBox}>
      <Text style={styles.signatureText}>Wonoayu, {formatDate(officialDate)}</Text>
      <Text style={styles.signatureText}>{isHeadmaster ? "Kepala SDN Simoangin-angin" : "Mengetahui"}</Text>
      {isHeadmaster ? null : <Text style={styles.signatureText}>Kepala SD Negeri Simoangin-angin</Text>}
      
      <View style={styles.signatureSpace} />
      
      <Text style={styles.signatureName}>{PRINCIPAL.NAME}</Text>
      <Text style={styles.signatureNip}>NIP. {PRINCIPAL.NIP}</Text>
    </View>
  </View>
);

export const LetterPdf = ({ data }: { data: LetterData }) => {
  
  const formattedBirthDate = formatDate(new Date(data.birthDate));
  
  // -------------------------------------------------------------
  // TEMPLATE 1: SURAT KETERANGAN AKTIF (ACTIVE_STUDENT)
  // -------------------------------------------------------------
  if (data.letterType === "ACTIVE_STUDENT") {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <KopSurat />
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>SURAT KETERANGAN</Text>
            <Text style={styles.titleNumber}>Nomor : {data.officialNumber}</Text>
          </View>
          
          <Text style={styles.text}>Yang bertanda tangan di bawah ini :</Text>
          <View style={styles.row}>
            <Text style={styles.colLabel}>N a m a</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{PRINCIPAL.NAME}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>NIP</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{PRINCIPAL.NIP}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Jabatan</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>Plt Kepala Sekolah SD Negeri Simoangin-angin</Text>
          </View>
          
          <Text style={styles.text}>menerangkan dengan sesungguhnya bahwa:</Text>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Nama</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.studentName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Tempat/ Tanggal Lahir</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.birthPlace}/ {formattedBirthDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Kelas</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.studentClass}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>NISN</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.nisn}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Nama Orang Tua/Wali</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.parentName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Alamat</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.address}</Text>
          </View>
          
          <View style={{ marginTop: 15 }} />
          <Text style={styles.text}>
            Bahwa benar nama tersebut di atas adalah peserta didik aktif pada SDN SIMOANGIN-ANGIN Tahun Ajaran 2026/2027.
          </Text>
          <Text style={styles.text}>
            Demikian surat keterangan ini kami buat dengan sesungguhnya digunakan untuk {data.purpose}.
          </Text>
          
          <View style={styles.signatureContainer}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureText}>Simoangin-angin, {formatDate(data.officialDate)}</Text>
              <Text style={styles.signatureText}>Mengetahui</Text>
              <Text style={styles.signatureText}>Kepala SD Negeri Simoangin-angin</Text>
              <View style={styles.signatureSpace} />
              <Text style={styles.signatureName}>{PRINCIPAL.NAME}</Text>
              <Text style={styles.signatureNip}>NIP. .{PRINCIPAL.NIP}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 2: SURAT KETERANGAN PINDAH SEKOLAH (TRANSFER)
  // -------------------------------------------------------------
  if (data.letterType === "TRANSFER") {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <KopSurat />
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>SURAT KETERANGAN PINDAH SEKOLAH</Text>
            <Text style={styles.titleNumber}>Nomor : {data.officialNumber}</Text>
          </View>
          
          <Text style={styles.text}>
            Yang bertanda tangan di bawah ini Kepala sekolah Dasar Negeri Simoangin-angin Kecamatan Wonoayu Kabupaten Sidoarjo Provinsi Jawa Timur menyatakan bahwa siswa berikut:
          </Text>
          
          <View style={{ marginTop: 5, paddingLeft: 20 }}>
            <View style={styles.row}>
              <Text style={styles.colLabel}>Nama</Text><Text style={styles.colColon}>:</Text>
              <Text style={styles.colValue}>{data.studentName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.colLabel}>Tempat/Tgl. Lahir</Text><Text style={styles.colColon}>:</Text>
              <Text style={styles.colValue}>{data.birthPlace}, {formattedBirthDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.colLabel}>NISN</Text><Text style={styles.colColon}>:</Text>
              <Text style={styles.colValue}>{data.nisn}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.colLabel}>Jenis Kelamin</Text><Text style={styles.colColon}>:</Text>
              <Text style={styles.colValue}>{data.gender || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.colLabel}>Kelas</Text><Text style={styles.colColon}>:</Text>
              <Text style={styles.colValue}>{data.studentClass}</Text>
            </View>
          </View>
          
          <Text style={[styles.text, { marginTop: 10 }]}>
            Sesuai surat permohonan pindah sekolah oleh Orang tua / Wali murid
          </Text>
          
          <View style={{ marginTop: 5, paddingLeft: 20 }}>
            <View style={styles.row}>
              <Text style={styles.colLabel}>Nama</Text><Text style={styles.colColon}>:</Text>
              <Text style={styles.colValue}>{data.parentName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.colLabel}>Pekerjaan</Text><Text style={styles.colColon}>:</Text>
              <Text style={styles.colValue}>{data.parentJob || "-"}</Text>
            </View>
          </View>
          
          <Text style={[styles.text, { marginTop: 15 }]}>
            Telah mengajukan pindah ke <Text style={styles.boldText}>{data.targetSchool || data.purpose}</Text>.
          </Text>
          <Text style={styles.text}>
            Bersama ini kami sertakan Hasil Belajar Siswa yang bersangkutan dan surat permohonan pindah Orang tua / Wali murid.
          </Text>
          <Text style={[styles.text, { marginTop: 15 }]}>
            Demikian surat permohonan ini kami sampaikan. Atas perhatiannya, kami sampaikan terima kasih.
          </Text>
          
          <Signature officialDate={data.officialDate} isHeadmaster={true} />
        </Page>
      </Document>
    );
  }

  // -------------------------------------------------------------
  // TEMPLATE 3: SURAT PENERIMAAN SISWA PINDAHAN (ACCEPTANCE)
  // -------------------------------------------------------------
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <KopSurat />
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SURAT KETERANGAN PENERIMAAN SISWA PINDAHAN</Text>
          <Text style={styles.titleNumber}>Nomor : {data.officialNumber}</Text>
        </View>
        
        <Text style={styles.text}>
          Yang bertanda tangan di bawah ini Kepala SD Negeri Simoangin-angin, Dengan ini menerangkan bahwa :
        </Text>
        
        <View style={{ marginTop: 10, paddingLeft: 20 }}>
          <View style={styles.row}>
            <Text style={styles.colLabel}>N a m a</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.studentName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Tempat, tanggal lahir</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.birthPlace}, {formattedBirthDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>NISN</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.nisn}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Kelas</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.studentClass}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Sekolah Asal</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.previousSchool || "-"}</Text>
          </View>
        </View>
        
        <View style={[styles.row, { marginTop: 10, paddingLeft: 20 }]}>
          <Text style={styles.colLabel}>Anak dari kedua Orang Tua</Text><Text style={styles.colColon}>:</Text>
          <Text style={styles.colValue}></Text>
        </View>
        
        <View style={{ paddingLeft: 20 }}>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Ayah</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.fatherName || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Ibu</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.motherName || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.colLabel}>Alamat</Text><Text style={styles.colColon}>:</Text>
            <Text style={styles.colValue}>{data.address}</Text>
          </View>
        </View>
        
        <Text style={[styles.text, { marginTop: 15 }]}>
          Bersedia menerima peserta didik tersebut di SD Negeri Simoangin-angin, apabila memenuhi syarat sebagai berikut :
        </Text>
        
        <View style={{ marginTop: 10 }}>
          <View style={styles.listRow}>
            <Text style={styles.listNumber}>1.</Text>
            <Text style={styles.listText}>Membawa surat keterangan pindah dari sekolah asal</Text>
          </View>
          <View style={styles.listRow}>
            <Text style={styles.listNumber}>2.</Text>
            <Text style={styles.listText}>Menyerahkan Raport hasil Nilai selama berada di sekolah Asal</Text>
          </View>
          <View style={styles.listRow}>
            <Text style={styles.listNumber}>3.</Text>
            <Text style={styles.listText}>Membawa Surat Mutasi Dapodik</Text>
          </View>
          <View style={styles.listRow}>
            <Text style={styles.listNumber}>4.</Text>
            <Text style={styles.listText}>Membawa Surat Rekomendasi Siswa Mutasi Dari Dinas Pendidikan Kab/Kota</Text>
          </View>
        </View>
        
        <Text style={[styles.text, { marginTop: 15 }]}>
          Demikian surat keterangan penerimaan siswa pindahan ini di buat, untuk dapat di pergunakan sebagaimana mestinya.
        </Text>
        
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Wonoayu, {formatDate(data.officialDate)}</Text>
            <Text style={styles.signatureText}>Kepala Sekolah,</Text>
            
            <View style={styles.signatureSpace} />
            
            <Text style={styles.signatureName}>{PRINCIPAL.NAME}</Text>
            <Text style={styles.signatureNip}>NIP. {PRINCIPAL.NIP}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
