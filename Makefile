#
# Combe - A Parsing Extension for JavaScript
#
# Copyright 2015 Lorenz Pretterhofer <krysole@alexicalmistake.com>
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

COMBEC ?= combec

combe_source_files = $(filter-out $(shell find . -name '~*'), $(shell find . -name '*.js.combe'))
combe_output_files = $(patsubst %.js.combe,%.js, $(combe_source_files))

default: compile



compile: $(combe_output_files)

%.js: %.js.combe
	$(COMBEC) -o $@ $<



clean:
	rm -f $(combe_output_files)
