# Artikel dari soal
ARTICLE = """
Dalam kehidupan suatu negara, pendidikan memegang peranan yang amat penting untuk menjamin kelangsungan hidup negara dan bangsa, 
karena pendidikan merupakan wahana untuk meningkatkan dan mengembangkan kualitas sumber daya manusia. 
Seiring dengan perkembangan teknologi komputer dan teknologi informasi, sekolah-sekolah di Indonesia sudah waktunya 
mengembangkan Sistem Informasi manajemennya agar mampu mengikuti perubahan jaman.

SISKO mampu memberikan kemudahan pihak pengelola menjalankan kegiatannya dan meningkatkan kredibilitas dan akuntabilitas sekolah di mata siswa, 
orang tua siswa, dan masyarakat umumnya. Penerapan teknologi informasi untuk menunjang proses pendidikan telah menjadi kebutuhan bagi lembaga pendidikan di Indonesia. 
Pemanfaatan teknologi informasi ini sangat dibutuhkan untuk meningkatkan efisiensi dan produktivitas bagi manajemen pendidikan. 
Keberhasilan dalam peningkatan efisiensi dan produktivitas bagi manajemen pendidikan akan ikut menentukan kelangsungan hidup lembaga pendidikan itu sendiri. 
Dengan kata lain menunda penerapan teknologi informasi dalam lembaga pendidikan berarti menunda kelancaran pendidikan dalam menghadapi persaingan global.

Pemanfaatan teknologi informasi diperuntukkan bagi peningkatan kinerja lembaga pendidikan dalam upayanya meningkatkan kualitas Sumber Daya Manusia Indonesia. 
Guru dan pengurus sekolah tidak lagi disibukkan oleh pekerjaan-pekerjaan operasional yang sesungguhnya dapat digantikan oleh komputer. 
Dengan demikian dapat memberikan keuntungan dalam efisien waktu dan tenaga.

Penghematan waktu dan kecepatan penyajian informasi akibat penerapan teknologi informasi tersebut akan memberikan kesempatan kepada guru dan pengurus 
sekolah untuk meningkatkan kualitas komunikasi dan pembinaan kepada siswa. Dengan demikian siswa akan merasa lebih dimanusiakan dalam upaya 
mengembangkan kepribadian dan pengetahuannya.
"""

import re

def count_word(article: str, target: str) -> int:
    # berapa kali sebuah kata muncul dalam teks
    words = re.findall(r'\b\w+\b', article.lower())  # Ambil semua kata
    return words.count(target.lower())


def replace_word(article: str, old: str, new: str) -> str:
    # mengganti sebuah kata dengan kata lain dalam teks
    pattern = r'\b' + re.escape(old) + r'\b'  # hanya mengganti kata utuh
    replaced_article = re.sub(pattern, new, article, flags=re.IGNORECASE)
    return replaced_article


def sort_words(article: str) -> list:
    # menampilkan daftar kata unik yang ada dalam teks, diurutkan secara alfabet
    words = re.findall(r'\b\w+\b', article.lower())
    unique_words = sorted(set(words))
    return unique_words

def main():
    print("="*60)
    print("PROGRAM ANALISIS ARTIKEL PENDIDIKAN".center(60))
    print("="*60)

    while True:
        print("\nMenu Pilihan:")
        print("1. Cari kata dalam artikel")
        print("2. Ganti kata dalam artikel")
        print("3. Tampilkan daftar kata terurut (A–Z)")
        print("0. Keluar")

        choice = input("\nMasukkan pilihan Anda (0–3): ").strip()

        if choice == "1":
            target = input("Masukkan kata yang ingin dicari: ").strip()
            count = count_word(ARTICLE, target)
            print(f"\nKata '{target}' ditemukan sebanyak {count} kali dalam artikel.")

        elif choice == "2":
            old_word = input("Masukkan kata yang ingin diganti: ").strip()
            new_word = input("Masukkan kata pengganti: ").strip()
            new_article = replace_word(ARTICLE, old_word, new_word)
            print("\n=== Artikel Setelah Penggantian ===\n")
            print(new_article)

        elif choice == "3":
            print("\n=== Daftar Kata Terurut (A–Z) ===\n")
            for w in sort_words(ARTICLE):
                print(w)
            print(f"\nTotal kata unik: {len(sort_words(ARTICLE))}")

        elif choice == "0":
            print("\nTerima kasih! Program selesai dijalankan.")
            break

        else:
            print("Pilihan tidak valid. Silakan coba lagi.")

if __name__ == "__main__":
    main()
