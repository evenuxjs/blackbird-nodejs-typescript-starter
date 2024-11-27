const aclMiddleware = (req, res, next) => {
  const acl = [
    { method: "GET", path: "/admin/users/list", permission: "api:users:list" },
    { method: "GET", path: "/admin/users/single", permission: "api:users:fetch" },
    { method: "POST", path: "/admin/users", permission: "api:users:create" },
    { method: "PUT", path: "/admin/users", permission: "api:users:update" },
    { method: "DELETE", path: "/admin/users", permission: "api:users:delete" },
  ];

  for (const entry of acl) {
    if (
      req.method === entry.method &&
      req.originalUrl.includes(entry.path) &&
      !req.permissions.includes(entry.permission)
    ) {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this resource." });
    }
  }

  next();
};

export { aclMiddleware };
