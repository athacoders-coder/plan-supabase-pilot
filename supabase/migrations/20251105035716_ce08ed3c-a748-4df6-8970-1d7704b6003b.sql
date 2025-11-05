-- Delete all existing blog posts
DELETE FROM posts;

-- Insert 15 new blog posts with construction/infrastructure theme
INSERT INTO posts (title, slug, content, excerpt, featured_image, status, author_id, published_at) VALUES
(
  'Panduan Lengkap Memilih Kontraktor Bangunan Terpercaya',
  'panduan-lengkap-memilih-kontraktor-bangunan-terpercaya',
  '<h2>Kriteria Kontraktor Profesional</h2><p>Memilih kontraktor yang tepat adalah langkah krusial dalam kesuksesan proyek konstruksi Anda. Berikut adalah panduan komprehensif untuk memilih kontraktor terpercaya.</p><h3>Legalitas dan Sertifikasi</h3><p>Pastikan kontraktor memiliki izin usaha yang lengkap, sertifikat kompetensi, dan terdaftar di asosiasi konstruksi resmi seperti LPJK atau Gapensi.</p><h3>Track Record dan Portfolio</h3><p>Tinjau proyek-proyek sebelumnya, minta referensi klien, dan kunjungi lokasi proyek yang telah diselesaikan untuk menilai kualitas pekerjaan.</p><h3>Transparansi RAB dan Timeline</h3><p>Kontraktor profesional akan memberikan Rencana Anggaran Biaya (RAB) yang detail dan timeline yang realistis dengan perhitungan material dan tenaga kerja yang transparan.</p>',
  'Pelajari cara memilih kontraktor konstruksi yang terpercaya dengan kriteria profesional untuk kesuksesan proyek bangunan Anda.',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '1 day'
),
(
  'Tahapan Penting dalam Konsultasi Proyek Konstruksi',
  'tahapan-penting-dalam-konsultasi-proyek-konstruksi',
  '<h2>Proses Konsultasi yang Efektif</h2><p>Konsultasi proyek adalah fondasi kesuksesan setiap pembangunan. Mari kita bahas tahapan-tahapan penting yang tidak boleh dilewatkan.</p><h3>Feasibility Study</h3><p>Studi kelayakan mencakup analisis lokasi, kondisi tanah, regulasi zonasi, dan proyeksi biaya untuk memastikan proyek viable secara teknis dan finansial.</p><h3>Perencanaan dan Desain</h3><p>Konsultan akan membantu mewujudkan visi Anda menjadi gambar kerja yang detail, lengkap dengan spesifikasi teknis dan perhitungan struktur.</p><h3>Quality Control</h3><p>Pengawasan berkala selama konstruksi memastikan pekerjaan sesuai standar dan spesifikasi yang telah ditetapkan.</p>',
  'Memahami tahapan konsultasi proyek konstruksi untuk memastikan perencanaan yang matang dan eksekusi yang sempurna.',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '2 days'
),
(
  'Tren Material Bangunan Ramah Lingkungan 2024',
  'tren-material-bangunan-ramah-lingkungan-2024',
  '<h2>Konstruksi Berkelanjutan</h2><p>Industri konstruksi semakin fokus pada keberlanjutan. Berikut adalah material ramah lingkungan yang trending di 2024.</p><h3>Beton Hijau (Green Concrete)</h3><p>Beton dengan komposisi fly ash atau slag sebagai pengganti sebagian semen, mengurangi emisi karbon hingga 40%.</p><h3>Bambu Laminasi</h3><p>Material struktural yang kuat, renewable, dan memiliki carbon footprint yang rendah dibanding kayu konvensional.</p><h3>Panel Surya Terintegrasi</h3><p>Building-integrated photovoltaics (BIPV) yang menjadi bagian estetis bangunan sekaligus sumber energi terbarukan.</p>',
  'Eksplorasi material konstruksi ramah lingkungan yang inovatif dan sustainable untuk proyek bangunan modern.',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '3 days'
),
(
  'Mengoptimalkan Budget Proyek Infrastruktur',
  'mengoptimalkan-budget-proyek-infrastruktur',
  '<h2>Manajemen Biaya yang Efektif</h2><p>Pengelolaan budget adalah aspek kritis dalam proyek infrastruktur. Pelajari strategi untuk memaksimalkan nilai investasi Anda.</p><h3>Value Engineering</h3><p>Analisis sistematis untuk mengidentifikasi alternatif material atau metode yang dapat mengurangi biaya tanpa mengorbankan kualitas dan fungsi.</p><h3>Phasing Strategy</h3><p>Membagi proyek menjadi fase-fase yang dapat disesuaikan dengan cash flow dan prioritas operasional.</p><h3>Risk Contingency Planning</h3><p>Alokasikan 10-15% budget untuk contingency guna mengantisipasi perubahan harga material atau unforeseen conditions.</p>',
  'Strategi proven untuk mengoptimalkan anggaran proyek infrastruktur dengan tetap menjaga kualitas dan timeline.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '4 days'
),
(
  'Teknologi BIM dalam Proyek Konstruksi Modern',
  'teknologi-bim-dalam-proyek-konstruksi-modern',
  '<h2>Building Information Modeling</h2><p>BIM merevolusi cara kita merencanakan dan membangun. Pahami manfaat dan implementasi teknologi ini.</p><h3>Koordinasi Multi-Disiplin</h3><p>BIM memungkinkan integrasi seamless antara arsitektur, struktur, dan MEP (mechanical, electrical, plumbing) dalam satu model 3D.</p><h3>Clash Detection</h3><p>Identifikasi konflik desain sebelum konstruksi dimulai, menghemat waktu dan biaya perbaikan di lapangan.</p><h3>Quantity Take-Off Otomatis</h3><p>Ekstraksi volume material secara akurat langsung dari model, meningkatkan presisi estimasi biaya.</p>',
  'Memahami teknologi BIM dan bagaimana implementasinya dapat meningkatkan efisiensi proyek konstruksi Anda.',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '5 days'
),
(
  'Standar K3 dalam Proyek Konstruksi',
  'standar-k3-dalam-proyek-konstruksi',
  '<h2>Keselamatan Kerja di Konstruksi</h2><p>Keselamatan dan Kesehatan Kerja (K3) adalah prioritas utama dalam setiap proyek konstruksi. Berikut implementasi standar yang wajib diterapkan.</p><h3>APD (Alat Pelindung Diri)</h3><p>Helm, safety shoes, harness, dan sarung tangan adalah keharusan. Pastikan semua pekerja menggunakan APD sesuai jenis pekerjaan.</p><h3>Safety Induction</h3><p>Program orientasi keselamatan untuk semua pekerja baru sebelum memasuki area proyek.</p><h3>Inspeksi Rutin</h3><p>Lakukan safety inspection harian dan dokumentasikan untuk memastikan compliance terhadap regulasi K3 konstruksi.</p>',
  'Panduan lengkap implementasi standar K3 untuk menciptakan lingkungan kerja konstruksi yang aman dan produktif.',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '6 days'
),
(
  'Perencanaan Drainase untuk Infrastruktur Perkotaan',
  'perencanaan-drainase-untuk-infrastruktur-perkotaan',
  '<h2>Sistem Drainase yang Efektif</h2><p>Drainase yang baik adalah kunci untuk mengatasi banjir dan genangan di area perkotaan. Pelajari prinsip perencanaan yang tepat.</p><h3>Analisis Hidrologi</h3><p>Perhitungan intensitas hujan, catchment area, dan run-off coefficient untuk menentukan kapasitas saluran yang dibutuhkan.</p><h3>Sistem Terpadu</h3><p>Integrasi antara drainase primer, sekunder, dan tersier dengan mempertimbangkan topografi dan tata guna lahan.</p><h3>Sustainable Urban Drainage</h3><p>Implementasi konsep bio-retention, permeable pavement, dan rain garden untuk manajemen air hujan yang berkelanjutan.</p>',
  'Desain sistem drainase perkotaan yang efektif untuk mengurangi risiko banjir dan meningkatkan kualitas lingkungan.',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '7 days'
),
(
  'Metode Konstruksi Jalan dan Perkerasan',
  'metode-konstruksi-jalan-dan-perkerasan',
  '<h2>Teknik Pembangunan Jalan</h2><p>Konstruksi jalan memerlukan perencanaan dan eksekusi yang presisi. Berikut metode-metode konstruksi jalan yang umum digunakan.</p><h3>Flexible Pavement</h3><p>Perkerasan lentur dengan lapis aspal yang cocok untuk jalan dengan beban lalu lintas menengah, mudah maintenance namun perlu perawatan berkala.</p><h3>Rigid Pavement</h3><p>Perkerasan beton yang lebih tahan lama untuk jalan dengan beban berat, initial cost lebih tinggi namun life cycle cost lebih ekonomis.</p><h3>Quality Control Testing</h3><p>Uji kepadatan, CBR, dan Marshall test untuk memastikan kualitas setiap layer memenuhi spesifikasi.</p>',
  'Metode dan teknik konstruksi jalan modern untuk menghasilkan infrastruktur berkualitas tinggi dan tahan lama.',
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '8 days'
),
(
  'Renovasi Bangunan: Tips dan Pertimbangan Penting',
  'renovasi-bangunan-tips-dan-pertimbangan-penting',
  '<h2>Merencanakan Renovasi yang Sukses</h2><p>Renovasi bangunan memerlukan perencanaan yang matang untuk menghindari pembengkakan biaya dan masalah struktural.</p><h3>Structural Assessment</h3><p>Lakukan pengecekan kondisi struktur existing sebelum renovasi, terutama jika akan menambah beban atau memodifikasi struktur utama.</p><h3>Permit dan Regulasi</h3><p>Pastikan renovasi Anda comply dengan IMB dan peraturan bangunan setempat untuk menghindari masalah legal di kemudian hari.</p><h3>Sequencing Pekerjaan</h3><p>Rencanakan urutan pekerjaan dengan baik untuk meminimalkan disruption dan memaksimalkan efisiensi waktu.</p>',
  'Panduan praktis merencanakan proyek renovasi bangunan dengan mempertimbangkan aspek struktural, legal, dan finansial.',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '9 days'
),
(
  'Manajemen Proyek Konstruksi dengan Metode Agile',
  'manajemen-proyek-konstruksi-dengan-metode-agile',
  '<h2>Agile dalam Konstruksi</h2><p>Metode Agile yang populer di software development kini diadaptasi untuk proyek konstruksi dengan hasil yang promising.</p><h3>Iterative Planning</h3><p>Perencanaan dalam sprint 2-4 minggu memungkinkan fleksibilitas dalam mengakomodasi perubahan requirement atau kondisi lapangan.</p><h3>Daily Stand-up Meetings</h3><p>Koordinasi harian yang singkat meningkatkan komunikasi tim dan identifikasi masalah lebih cepat.</p><h3>Continuous Improvement</h3><p>Sprint retrospective untuk evaluasi dan improvement berkelanjutan dalam proses kerja.</p>',
  'Implementasi metode Agile dalam manajemen proyek konstruksi untuk meningkatkan adaptabilitas dan efisiensi.',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '10 days'
),
(
  'Desain Pondasi untuk Berbagai Jenis Tanah',
  'desain-pondasi-untuk-berbagai-jenis-tanah',
  '<h2>Memilih Jenis Pondasi yang Tepat</h2><p>Pondasi adalah elemen struktural paling kritis. Pemilihan jenis pondasi harus disesuaikan dengan karakteristik tanah.</p><h3>Soil Investigation</h3><p>Lakukan sondir atau boring test untuk mengetahui daya dukung tanah, kedalaman tanah keras, dan muka air tanah.</p><h3>Pondasi Dangkal vs Dalam</h3><p>Pondasi telapak atau raft cocok untuk tanah keras di kedalaman dangkal, sementara tiang pancang atau bore pile untuk tanah lunak.</p><h3>Settlement Analysis</h3><p>Perhitungan penurunan tanah untuk memastikan differential settlement tidak melebihi batas yang diijinkan.</p>',
  'Panduan teknis memilih dan mendesain sistem pondasi yang sesuai dengan kondisi tanah untuk keamanan struktural optimal.',
  'https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '11 days'
),
(
  'Penggunaan Precast dalam Konstruksi Modern',
  'penggunaan-precast-dalam-konstruksi-modern',
  '<h2>Keunggulan Sistem Precast</h2><p>Komponen precast menawarkan solusi konstruksi yang cepat dan berkualitas konsisten. Mari kita bahas implementasinya.</p><h3>Quality Control di Pabrik</h3><p>Produksi di lingkungan terkontrol menghasilkan kualitas beton yang superior dan dimensi yang presisi.</p><h3>Percepatan Waktu</h3><p>Elemen dapat diproduksi parallel dengan pekerjaan pondasi, signifikan mempercepat timeline proyek.</p><h3>Design for Manufacturing</h3><p>Koordinasi detail connection dan sequence erection sejak tahap desain untuk memastikan instalasi yang smooth.</p>',
  'Memahami sistem konstruksi precast dan manfaatnya dalam efisiensi waktu, biaya, dan kualitas proyek.',
  'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '12 days'
),
(
  'Smart Building: Integrasi IoT dalam Bangunan',
  'smart-building-integrasi-iot-dalam-bangunan',
  '<h2>Teknologi Smart Building</h2><p>Internet of Things (IoT) mengubah cara kita mengelola dan mengoperasikan bangunan modern.</p><h3>Building Management System</h3><p>Sistem terintegrasi untuk monitoring dan kontrol HVAC, lighting, dan energy consumption secara real-time.</p><h3>Sensor Network</h3><p>Jaringan sensor occupancy, temperature, humidity, dan air quality untuk optimasi kenyamanan dan efisiensi energi.</p><h3>Predictive Maintenance</h3><p>Analisis data dari sensor untuk prediksi kebutuhan maintenance sebelum terjadi breakdown.</p>',
  'Eksplorasi teknologi Smart Building dan IoT untuk menciptakan bangunan yang efisien, nyaman, dan berkelanjutan.',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '13 days'
),
(
  'Metode Perkuatan Struktur Bangunan Existing',
  'metode-perkuatan-struktur-bangunan-existing',
  '<h2>Retrofitting dan Strengthening</h2><p>Perkuatan struktur diperlukan untuk peningkatan kapasitas atau perbaikan kerusakan. Berikut metode-metode yang tersedia.</p><h3>Carbon Fiber Reinforced Polymer</h3><p>CFRP memberikan kekuatan tinggi dengan penambahan berat minimal, ideal untuk perkuatan balok dan kolom.</p><h3>Jacketing Beton</h3><p>Penambahan selimut beton bertulang untuk meningkatkan kapasitas dan daktilitas elemen struktur.</p><h3>Base Isolation</h3><p>Sistem isolasi gempa untuk meningkatkan ketahanan seismik bangunan existing.</p>',
  'Teknik dan metode perkuatan struktur bangunan existing untuk meningkatkan kapasitas dan keamanan struktural.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '14 days'
),
(
  'Sertifikasi Bangunan Hijau di Indonesia',
  'sertifikasi-bangunan-hijau-di-indonesia',
  '<h2>Green Building Certification</h2><p>Sertifikasi bangunan hijau bukan hanya trend, tapi investasi jangka panjang yang menguntungkan. Pahami proses dan manfaatnya.</p><h3>GREENSHIP Rating System</h3><p>Standar sertifikasi GBC Indonesia yang menilai aspek energy efficiency, water conservation, dan indoor air quality.</p><h3>ROI dari Green Building</h3><p>Penghematan operational cost 20-30%, peningkatan nilai properti, dan tax incentive dari pemerintah.</p><h3>Documentation Requirements</h3><p>Persiapan dokumen design, as-built, dan commissioning report untuk proses sertifikasi yang smooth.</p>',
  'Panduan lengkap proses sertifikasi bangunan hijau di Indonesia dan manfaat jangka panjangnya untuk investasi properti.',
  'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800',
  'published',
  'b3c9a6bb-2a5c-4115-9edd-2fdddf4dcdde',
  now() - interval '15 days'
);