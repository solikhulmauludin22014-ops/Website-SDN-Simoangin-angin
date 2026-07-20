import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { SCHOOL, PRINCIPAL, LETTER_TYPE_LABELS } from "@/lib/school-config";

// Register a standard font for better Indonesian text rendering
Font.register({
  family: "Times",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times New Roman.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-bold@1.0.4/Times New Roman Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times",
    fontSize: 12,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 60,
    lineHeight: 1.6,
  },
  // Kop surat
  kopContainer: {
    borderBottomWidth: 3,
    borderBottomColor: "#000",
    paddingBottom: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  kopTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  kopSchool: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  kopAddress: {
    fontSize: 9,
    marginTop: 4,
    textAlign: "center",
    color: "#333",
  },
  kopLine2: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginTop: 2,
  },
  // Judul surat
  titleContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    textDecoration: "underline",
    letterSpacing: 2,
  },
  officialNumber: {
    fontSize: 11,
    marginTop: 2,
  },
  // Body
  paragraph: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
  },
  // Identity table
  identityRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  identityLabel: {
    width: 160,
    fontSize: 12,
  },
  identitySeparator: {
    width: 15,
    fontSize: 12,
  },
  identityValue: {
    flex: 1,
    fontSize: 12,
  },
  // Penutup
  closingContainer: {
    marginTop: 30,
    alignItems: "flex-end",
  },
  closingBlock: {
    width: 250,
    alignItems: "center",
  },
  closingPlace: {
    fontSize: 12,
    marginBottom: 4,
  },
  closingTitle: {
    fontSize: 12,
    marginBottom: 60,
  },
  closingName: {
    fontSize: 12,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  closingNip: {
    fontSize: 11,
  },
});

type LetterPdfProps = {
  data: {
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
  };
};

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function LetterPdf({ data }: LetterPdfProps) {
  const letterTitle =
    data.letterType === "TRANSFER"
      ? "SURAT KETERANGAN PINDAH"
      : "SURAT KETERANGAN";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── Kop Surat ──────────────────────────── */}
        <View style={styles.kopContainer}>
          <Text style={styles.kopTitle}>Pemerintah Kabupaten Sidoarjo</Text>
          <Text style={styles.kopTitle}>Dinas Pendidikan dan Kebudayaan</Text>
          <Text style={styles.kopSchool}>{SCHOOL.name}</Text>
          <Text style={styles.kopAddress}>
            {SCHOOL.address}, {SCHOOL.province}
          </Text>
          <Text style={styles.kopAddress}>
            Telepon: {SCHOOL.phone} | Email: {SCHOOL.email}
          </Text>
        </View>
        <View style={styles.kopLine2} />

        {/* ── Judul ──────────────────────────────── */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{letterTitle}</Text>
          <Text style={styles.officialNumber}>
            Nomor: {data.officialNumber}
          </Text>
        </View>

        {/* ── Pembuka ────────────────────────────── */}
        <Text style={styles.paragraph}>
          Yang bertanda tangan di bawah ini, {PRINCIPAL.title}{" "}
          {SCHOOL.name}, menerangkan bahwa:
        </Text>

        {/* ── Identitas Siswa ────────────────────── */}
        <View style={{ marginBottom: 12, marginLeft: 20 }}>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>Nama</Text>
            <Text style={styles.identitySeparator}>:</Text>
            <Text style={[styles.identityValue, styles.bold]}>
              {data.studentName}
            </Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>NISN</Text>
            <Text style={styles.identitySeparator}>:</Text>
            <Text style={styles.identityValue}>{data.nisn}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>Tempat, Tanggal Lahir</Text>
            <Text style={styles.identitySeparator}>:</Text>
            <Text style={styles.identityValue}>
              {data.birthPlace}, {formatDate(data.birthDate)}
            </Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>Kelas</Text>
            <Text style={styles.identitySeparator}>:</Text>
            <Text style={styles.identityValue}>{data.studentClass}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>Nama Orang Tua / Wali</Text>
            <Text style={styles.identitySeparator}>:</Text>
            <Text style={styles.identityValue}>{data.parentName}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.identityLabel}>Alamat</Text>
            <Text style={styles.identitySeparator}>:</Text>
            <Text style={styles.identityValue}>{data.address}</Text>
          </View>
        </View>

        {/* ── Keterangan ─────────────────────────── */}
        <Text style={styles.paragraph}>
          Adalah benar siswa/siswi{" "}
          {SCHOOL.name} yang masih aktif terdaftar pada
          tahun pelajaran berjalan.
        </Text>

        <Text style={styles.paragraph}>
          Surat keterangan ini dibuat untuk keperluan:{" "}
          <Text style={styles.bold}>{data.purpose}</Text>.
        </Text>

        <Text style={styles.paragraph}>
          Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat
          dipergunakan sebagaimana mestinya.
        </Text>

        {/* ── Penutup & Tanda Tangan ─────────────── */}
        <View style={styles.closingContainer}>
          <View style={styles.closingBlock}>
            <Text style={styles.closingPlace}>
              Sidoarjo, {formatDate(data.officialDate)}
            </Text>
            <Text style={styles.closingTitle}>{PRINCIPAL.title},</Text>
            <Text style={styles.closingName}>{PRINCIPAL.name}</Text>
            <Text style={styles.closingNip}>NIP. {PRINCIPAL.nip}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
