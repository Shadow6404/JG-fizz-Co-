import './globals.css';

export const metadata = {
  title: 'JG Fizz Co (Placeholder)',
  description: 'Whimsical, giftable bath bombs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
