module.exports =
  rot13: (s) -> # http://stackoverflow.com/a/617685
    s.replace /[a-zA-Z]/g, (c) ->
      String.fromCharCode if (if c <= 'Z' then 90 else 122) >= (c = c.charCodeAt(0) + 13) then c else c - 26
