#
# Combe - Improved JavaScript with Pattern Matching
#
# Copyright 2012 Lorenz Pretterhofer <krysole@alexicalmistake.com>
#
# Permission to use, copy, modify, and distribute this software for any
# purpose with or without fee is hereby granted, provided that the above
# copyright notice and this permission notice appear in all copies.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
# WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
# ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
# WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
# ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
# OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
#

require "rake/clean"

CLEAN.include("CompilerCopy/*.combejs")

SRC = FileList["CompilerCopy/*.combe"]
TARGET = SRC.ext(".combejs")

rule ".combejs" => [".combe"] do |t|
  sh "newcombec -o #{t.name} #{t.source}"
end

task :compileDirectory, :dirname, :force do |t, args|
  src = FileList["#{args[:dirname]}/**/*.combe"]
  target = src.ext(".combejs")
  target.each do |name|
    if args[:force]
      Rake::Task[name].execute
    else
      Rake::Task[name].invoke
    end
  end
end
