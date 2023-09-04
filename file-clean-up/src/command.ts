import { Command } from "commander";

const program = new Command();

program
  .name("file-cleanup")
  .description("CLI to clean folders with programatically option.");

program.option("-s, --schedule <schedule>", "Cron schedule expression.");

program.parse();

export default program;
