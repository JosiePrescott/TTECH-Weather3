const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
footer.innerHTML = `
  <p>
    &copy; ${new Date().getFullYear()} | Josie Prescott |
    <a href="https://tooeletech.edu/">Tooele Technical College</a>
    <br />
    Last updated: ${currentDate}
  </p>
`;
